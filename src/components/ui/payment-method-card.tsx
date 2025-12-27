import type { ReactNode } from "react";

type PaymentMethodCardProps = {
  platform: string;
  currentMethod: string;
  setCurrentMethod: (method: string) => void;
};

type MethodData = {
  [key: string]: {
    name: string;
    border: string;
    color: string;
    logo: string;
  };
};

export default function PaymentMethodCard({
  platform,
  currentMethod,
  setCurrentMethod,
}: PaymentMethodCardProps): ReactNode {
  const isSelected = currentMethod === platform;
  const methodData: MethodData = {
    bkash: {
      name: "bkash",
      border: "#E91E63",
      color: "#FCF5F8",
      logo: "/payment/bkash.png",
    },
    nagad: {
      name: "nagad",
      border: "#FFC107",
      color: "#FDFCF4",
      logo: "/payment/nagad.png",
    },
    rocket: {
      name: "rocket",
      border: "#e6caff",
      color: "#f8f4fd",
      logo: "/payment/rocket.png",
    },
  };

  const methodInfo = methodData[platform];

  return (
    <button
      className={`w-24 h-20 rounded-lg flex justify-center items-center transition-all duration-200 ease-in-out border hover:border-[${methodInfo.border}] hover:bg-[${methodInfo.color}] cursor-pointer`}
      onClick={() => setCurrentMethod(platform)}
      type="button"
      style={{
        borderColor: isSelected ? methodInfo.border : "var(--primary-color)",
        backgroundColor: isSelected ? methodInfo.color : "var(--primary-bg)",
        filter: isSelected ? "none" : "grayscale(80%)",
      }}
    >
      <img src={methodInfo.logo} alt={methodInfo.name} className="px-2" />
    </button>
  );
}
