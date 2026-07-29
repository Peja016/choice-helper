// src/containers/HomePage/index.tsx
// 幸運輪盤主元件
import { useState, useRef, useEffect, useCallback } from "react";
import { Box, Center, Flex, Input } from "@chakra-ui/react";
import { Button, Text } from "@/components/ui";

import IntroductionModal from "./IntroductionModal";
/**
 * 產生隨機十六進位顏色
 * 使用 crypto.getRandomValues 取代 Math.random 提升隨機性
 */
function getRandomHexColor(): string {
  const array = new Uint8Array(3);
  crypto.getRandomValues(array);
  return (
    "#" +
    Array.from(array)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

/**
 * 驗證 sessionStorage 中的 prizes 資料
 * 防止惡意注入的資料造成非預期行為
 */
function validatePrizes(data: unknown): string[] {
  if (!Array.isArray(data)) return [];
  return (
    data
      // 【資安】過濾非字串項目，避免 XSS 或型別錯誤
      .filter((item): item is string => typeof item === "string")
      // 【資安】限制每個選項最多 50 字元，防止過長輸入
      .map((item) => item.slice(0, 50))
      // 【資安】限制最多 20 個選項，防止 DoS
      .slice(0, 20)
  );
}

const HomePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<string[]>([]);

  const [angle, setAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rawPrizeArr, setRawPrizeArr] = useState<unknown[]>([]);
  const prizes = validatePrizes(rawPrizeArr);
  const [prize, setPrize] = useState("");
  const [selectedPrize, setSelectedPrize] = useState<string | undefined>();
  const [isOpen, setOpen] = useState(true);

  // 當選項數量變動時，重新產生對應的顏色陣列
  useEffect(() => {
    if (prizes.length > 0) {
      colorRef.current = Array.from({ length: prizes.length }, () =>
        getRandomHexColor(),
      );
    }
  }, [prizes.length]);

  /**
   * 繪製輪盤到 Canvas
   * @param ctx - Canvas 2D Context
   * @param width - Canvas 寬度
   * @param height - Canvas 高度
   * @param angleOffset - 目前旋轉角度（弧度）
   */
  const drawWheel = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      angleOffset = 0,
    ) => {
      if (prizes.length === 0) {
        // 若無選項則清空畫布並提示
        ctx.clearRect(0, 0, width, height);
        ctx.font = "14px sans-serif";
        ctx.fillStyle = "#999";
        ctx.textAlign = "center";
        ctx.fillText("Input the options", width / 2, height / 2);
        return;
      }

      const radius = width / 2;
      const centerX = width / 2;
      const centerY = height / 2;
      const arc = (2 * Math.PI) / prizes.length;

      ctx.clearRect(0, 0, width, height);

      prizes.forEach((p, i) => {
        const startAngle = i * arc + angleOffset - Math.PI / 2;
        const endAngle = startAngle + arc;

        // 繪製扇形色塊
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colorRef.current[i] ?? "#cccccc";
        ctx.fill();

        // 繪製選項文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + arc / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "14px sans-serif";
        // fillText 不解析 HTML，不存在 XSS 風險
        ctx.fillText(p, radius - 10, 5);
        ctx.restore();
      });

      // 繪製中央指針三角形
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - radius + 10);
      ctx.lineTo(centerX - 10, centerY - radius - 20);
      ctx.lineTo(centerX + 10, centerY - radius - 20);
      ctx.closePath();
      ctx.fillStyle = "black";
      ctx.fill();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prizes],
  );

  // 每次 angle 或 prizes 改變時重繪輪盤
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawWheel(ctx, canvas.width, canvas.height, angle);
  }, [angle, prizes, drawWheel]);

  const startSpinning = () => {
    if (isSpinning || prizes.length < 2) return;
    setIsSpinning(true);

    let currentAngle = angle;
    // 隨機旋轉：至少 6 圈 + 額外隨機角度
    const totalRotation = Math.random() * 360 + 360 * 6;
    const target = currentAngle + (totalRotation * Math.PI) / 180;
    const duration = 3000;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // ease out cubic：讓輪盤從快到慢自然減速
      const eased = 1 - Math.pow(1 - t, 3);
      currentAngle = angle + eased * (target - angle);

      setAngle(currentAngle);

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        // 計算指針指向的獎項索引（指針在頂部，從 12 點方向開始）
        const degree = 360 / prizes.length;
        const deg = ((currentAngle * 180) / Math.PI) % 360;
        const normalizedDeg = (deg + 360) % 360;
        const prizeIndex =
          prizes.length - 1 - Math.floor(normalizedDeg / degree);
        const safeIndex =
          ((prizeIndex % prizes.length) + prizes.length) % prizes.length;
        setSelectedPrize(prizes[safeIndex]);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <Center px="1em" flexDir="column">
      {/* 輸入區：新增選項 */}
      <Flex gap={2} align="center" mt="1em">
        <Text>Input options:</Text>
        <Input
          value={prize}
          flex={1}
          maxLength={50}
          placeholder="max 50 letters"
          onChange={(e) => setPrize(e.target.value)}
          onKeyDown={(e) => {
            // 支援 Enter 鍵快速新增
            if (e.key === "Enter" && prize.trim()) {
              setRawPrizeArr([...prizes, prize.trim()]);
              setPrize("");
            }
          }}
        />
        <Button
          onClick={() => {
            if (!prize.trim()) return;
            // 【修復】使用不可變方式更新 state，避免直接 mutate 陣列
            setRawPrizeArr([...prizes, prize.trim()]);
            setPrize("");
          }}
          isDisabled={isSpinning || !prize.trim()}
        >
          Confirm
        </Button>
      </Flex>

      {/* 已新增的選項標籤列表 */}
      <Flex gap={4} flexWrap="wrap" mt="1em" justifyContent="center">
        {prizes.map((d, i) => (
          <Flex alignItems="center" gap={2} key={i}>
            <Box bg="blue.500" p="0.5em" borderRadius="0.5rem" color="white">
              {d}
            </Box>
            <Button
              bg="red.500"
              _hover={{ bg: "red.600" }}
              onClick={() => {
                // 【修復】使用 filter 取代 splice，保持不可變性
                setRawPrizeArr(prizes.filter((_, idx) => idx !== i));
                setAngle(0);
                setSelectedPrize(undefined);
              }}
              isDisabled={isSpinning}
              size="sm"
            >
              Delete
            </Button>
          </Flex>
        ))}
      </Flex>

      {/* 輪盤 Canvas */}
      <Box my="1em">
        <canvas ref={canvasRef} width={320} height={320} />
      </Box>

      {/* 旋轉按鈕：少於 2 個選項時禁用 */}
      <Button
        mt="1em"
        onClick={startSpinning}
        isDisabled={isSpinning || prizes.length < 2}
        title={prizes.length < 2 ? "Please enter at least 2 options" : ""}
      >
        {isSpinning ? "Processing..." : "Start the roulette"}
      </Button>

      {/* 結果顯示 */}
      {selectedPrize && (
        <Text mt="1em" fontSize="xl" fontWeight="bold">
          🎉 Result: {selectedPrize}
        </Text>
      )}

      {/* 使用說明 Modal */}
      <IntroductionModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </Center>
  );
};

export default HomePage;
