import type { RegistrationFormType } from "@/lib/validation/register-schema";
import {
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import {
  useWatch,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import { Checkbox, FormControlLabel } from "@mui/material";
import type { SegmentType } from "@/types/global-types";
import FormBox from "../../form-box";

type SegmentSelectionFieldsProps = {
  register: UseFormRegister<RegistrationFormType>;
  setValue: UseFormSetValue<RegistrationFormType>;
  errors: { [key: string]: any };
  segments: SegmentType[];
  selectedSegments: string[];
  setSelectedSegments: Dispatch<SetStateAction<string[]>>;
  control: any;
};

export default function SegmentSelectionFields({
  register,
  setValue,
  errors,
  segments,
  selectedSegments,
  setSelectedSegments,
  control,
}: SegmentSelectionFieldsProps): ReactNode {
  const category = useWatch({
    control: control,
    name: "category",
  }) as string;

  const [availableSegments, setAvailableSegments] = useState<SegmentType[]>([]);

  useEffect(() => {
    if (!category) {
      setSelectedSegments([]);
      setValue("segments", []);
    }

    const filteredSegments = segments.filter((segment) => {
      if (category) {
        return segment.category.length > 0
          ? segment.category.includes(category)
          : true;
      }
      return false;
    });

    const updatedSelectedSegments = selectedSegments.filter((segment) => {
      const segmentObj = segments.find((s) => s.title === segment);
      return segmentObj ? filteredSegments.includes(segmentObj) : false;
    });

    setAvailableSegments(filteredSegments);
    setSelectedSegments(updatedSelectedSegments);
    setValue("segments", updatedSelectedSegments);
  }, [category]);

  const unavailableSegments = segments.filter((segment) => {
    return !availableSegments.includes(segment);
  });

  return (
    <>
      <FormBox title="Segment Selection">
        <div className="flex flex-col gap-2">
          <p className="italic text-primary">
            Note: You can register for team and paid segments after completing
            the registration for solo and free segments. Team and paid segments
            registrations are done separately. (Select grade/class first to see
            the available segments for your category)
          </p>

          <div className="flex flex-col gap-6">
            <div className="w-full grid grid-cols-2 max-2xl:grid-cols-1 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
              {availableSegments.map((segment, index) => {
                return (
                  <SegmentCheckbox
                    key={index}
                    segment={segment}
                    selectedSegments={selectedSegments}
                    isDisabled={false}
                    setSelectedSegments={setSelectedSegments}
                    setValue={setValue}
                    register={register}
                  />
                );
              })}
              {unavailableSegments.map((segment, index) => {
                return (
                  <SegmentCheckbox
                    key={index}
                    segment={segment}
                    selectedSegments={selectedSegments}
                    isDisabled={true}
                    setSelectedSegments={setSelectedSegments}
                    setValue={setValue}
                    register={register}
                  />
                );
              })}
            </div>
            {errors.segments && (
              <p className="text-red-600 text-sm">
                {errors.segments.message as string}
              </p>
            )}
          </div>
        </div>
      </FormBox>
    </>
  );
}

function SegmentCheckbox({
  segment,
  selectedSegments,
  isDisabled,
  setSelectedSegments,
  setValue,
  register,
}: {
  segment: SegmentType;
  selectedSegments: string[];
  isDisabled: boolean;
  setSelectedSegments: Dispatch<SetStateAction<string[]>>;
  setValue: UseFormSetValue<RegistrationFormType>;
  register: UseFormRegister<RegistrationFormType>;
}): ReactNode {
  return (
    <div
      className="flex items-center px-5 py-3 rounded-sm border border-primary hover:bg-light-gray/20! transition-colors cursor-pointer"
      style={{
        background: selectedSegments.includes(segment.title)
          ? "color-mix(in oklab, var(--light-gray) 20%, transparent)"
          : "color-mix(in oklab, var(--white) 20%, transparent)",
        opacity: isDisabled ? 0.4 : 1,
        userSelect: isDisabled ? "none" : "auto",
        pointerEvents: isDisabled ? "none" : "auto",
      }}
      onClick={() => {
        let updatedSegments;
        if (selectedSegments.includes(segment.title)) {
          updatedSegments = selectedSegments.filter(
            (item) => item !== segment.title,
          );
        } else {
          updatedSegments = [...selectedSegments, segment.title];
        }
        setSelectedSegments(updatedSegments);
        setValue("segments", updatedSegments); // Sync with form
      }}
    >
      <div className="pointer-events-none select-none">
        <FormControlLabel
          control={
            <Checkbox
              {...register("segments")}
              checked={selectedSegments.includes(segment.title)}
              style={{
                color: "var(--primary-color)",
              }}
            />
          }
          label={segment.title}
          style={{
            pointerEvents: "none",
            color: "var(--primary-color)",
          }}
        />
      </div>
    </div>
  );
}
