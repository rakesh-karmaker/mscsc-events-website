import { useEffect, useState, type ReactNode } from "react";
import PaymentMethodCard from "./payment-method-card";

type PaymentStepsProps = {
  transactionMethods: {
    [platform: string]: { number: string; code: string; qrCodeUrl?: string };
  };
  fees: number;
  method?: string;
  setMethod: (method: string) => void;
};

export default function PaymentSteps({
  transactionMethods,
  method = "bkash",
  fees,
  setMethod,
}: PaymentStepsProps): ReactNode {
  const [currentMethod, setCurrentMethod] = useState<string>(method);

  useEffect(() => {
    setMethod(currentMethod);
  }, [currentMethod, setMethod]);

  const currentMethodData = transactionMethods[currentMethod];

  return (
    <div className="w-full flex justify-between gap-5 flex-wrap">
      <div className="flex flex-col gap-3">
        <div className="w-fit flex gap-2 max-lg:flex-wrap">
          {Object.keys(transactionMethods).map((platform) => (
            <PaymentMethodCard
              key={platform}
              platform={platform}
              currentMethod={currentMethod}
              setCurrentMethod={setCurrentMethod}
            />
          ))}
        </div>
        <Steps
          currentMethodData={currentMethodData}
          currentMethod={currentMethod}
          fees={fees}
        />
      </div>
      <QrCode
        qrCodeUrl={currentMethodData.qrCodeUrl}
        platform={currentMethod}
      />
    </div>
  );
}

function QrCode({
  qrCodeUrl,
  platform,
}: {
  qrCodeUrl?: string;
  platform: string;
}): ReactNode {
  if (!qrCodeUrl) return null;

  return (
    <div className="p-4 rounded-md border-1 bg-pure-white border-light-gray/90 flex flex-col gap-2 items-center">
      <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 object-contain" />
      <h4 className="font-medium text-gray-600 text-sm">
        Scan to pay via {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </h4>
    </div>
  );
}

function Steps({
  currentMethodData,
  currentMethod,
  fees,
}: {
  currentMethodData: { number: string; code: string; qrCodeUrl?: string };
  currentMethod: string;
  fees: number;
}): ReactNode {
  return (
    <ul className="list-disc pl-5">
      <li className="text-gray-700">
        Open{" "}
        <span className="font-medium">
          {currentMethod.charAt(0).toUpperCase() + currentMethod.slice(1)} app
        </span>{" "}
        or dial <span className="font-medium">{currentMethodData.code}</span>
      </li>
      <li className="text-gray-700">
        Send amount <span className="font-medium">৳{fees}</span> to this number{" "}
        <span className="font-medium">{currentMethodData.number}</span>
      </li>
      <li className="text-gray-700">
        Copy transaction ID after successful send money
      </li>
      <li className="text-gray-700">
        Paste transaction ID and payment phone number below
      </li>
    </ul>
  );
}
