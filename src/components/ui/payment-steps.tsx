import { useEffect, useState, type ReactNode } from "react";
import PaymentMethodCard from "./payment-method-card";
import { TRANSACTION_METHOD_CODES } from "@/services/transaction-method-codes";

type PaymentStepsProps = {
  transactionMethods: {
    [platform: string]: {
      number: string;
      qrCodeUrl?: string;
      qrCodePublicId?: string;
    };
  };
  fees: number;
  method?: string;
  setMethod: (method: string) => void;
  ref: string;
};

export default function PaymentSteps({
  transactionMethods,
  method = Object.keys(transactionMethods)[0],
  fees,
  setMethod,
  ref,
}: PaymentStepsProps): ReactNode {
  const [currentMethod, setCurrentMethod] = useState<string>(method);

  useEffect(() => {
    setMethod(currentMethod);
  }, [currentMethod, setMethod]);

  const currentMethodData = {
    ...transactionMethods[currentMethod],
    code: TRANSACTION_METHOD_CODES[currentMethod] || "",
  };

  return (
    <div className="w-full flex justify-between gap-5 max-lg:flex-wrap">
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
          ref={ref}
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
    <div className="p-4 rounded-md border bg-primary-bg border-primary flex flex-col gap-2 items-center min-w-56.5">
      <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 object-contain" />
      <h4 className="font-medium text-text text-sm">
        Scan to pay via {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </h4>
    </div>
  );
}

function Steps({
  currentMethodData,
  currentMethod,
  fees,
  ref,
}: {
  currentMethodData: { number: string; code: string; qrCodeUrl?: string };
  currentMethod: string;
  fees: number;
  ref: string;
}): ReactNode {
  return (
    <ul className="list-disc pl-5">
      <li className="text-text">
        Open{" "}
        <span className="font-medium">
          {currentMethod.charAt(0).toUpperCase() + currentMethod.slice(1)} app
        </span>{" "}
        or dial <span className="font-medium">{currentMethodData.code}</span>
      </li>
      <li className="text-text">
        Send amount <span className="font-medium">৳{fees}</span> to this number{" "}
        <span className="font-medium">{currentMethodData.number}</span>
      </li>
      <li className="text-text">
        Add{" "}
        <span className="font-medium px-2 py-1 bg-orange-50 border border-primary/60 rounded-sm">
          {ref}
        </span>{" "}
        in the transaction note or as reference.{" "}
      </li>
      <li className="text-text">
        Copy transaction ID after successful send money
      </li>
      <li className="text-text">
        Paste transaction ID and payment phone number below
      </li>
    </ul>
  );
}
