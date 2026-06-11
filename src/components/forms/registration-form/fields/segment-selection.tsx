import type { RegistrationFormType } from "@/lib/validation/register-schema";
import {
  Activity,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
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
};

export default function SegmentSelectionFields({
  register,
  setValue,
  errors,
  segments,
  selectedSegments,
  setSelectedSegments,
}: SegmentSelectionFieldsProps): ReactNode {
  const [teamSegments, setTeamSegments] = useState<SegmentType[]>([]);

  return (
    <>
      <FormBox title="Segment Selection">
        <div className="flex flex-col gap-2">
          <p className="italic text-primary">
            Note: You can register for team and paid segments after completing
            the registration for solo and free segments. Team and paid segments
            registrations are done separately.
          </p>

          <div className="flex flex-col gap-6">
            <div className="w-full grid grid-cols-2 max-2xl:grid-cols-1 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-4">
              {segments.map((segment, index) => (
                <div
                  key={index}
                  className="flex items-center px-5 py-3 rounded-sm border border-primary hover:bg-light-gray/20! transition-colors cursor-pointer"
                  style={{
                    background: selectedSegments.includes(segment.title)
                      ? "color-mix(in oklab, var(--light-gray) 20%, transparent)"
                      : "color-mix(in oklab, var(--white) 20%, transparent)",
                  }}
                  onClick={() => {
                    let updatedSegments;
                    if (selectedSegments.includes(segment.title)) {
                      updatedSegments = selectedSegments.filter(
                        (item) => item !== segment.title,
                      );
                      if (segment.teamType === "team") {
                        setTeamSegments((prev) =>
                          prev.filter(
                            (item) => item.segmentSlug !== segment.segmentSlug,
                          ),
                        );
                      }
                    } else {
                      updatedSegments = [...selectedSegments, segment.title];
                      if (segment.teamType === "team") {
                        setTeamSegments((prev) => [...prev, segment]);
                      }
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
              ))}
            </div>
            {errors.segments && (
              <p className="text-red-600 text-sm">
                {errors.segments.message as string}
              </p>
            )}
          </div>
        </div>
      </FormBox>

      <Activity mode={teamSegments.length > 0 ? "visible" : "hidden"}>
        <FormBox title="Team Segments Details">
          <div className="text-[1.05rem] flex flex-col gap-2">
            <p className="text-[1.1rem] font-medium">
              Important Team Registration Notes:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                The <span className="font-medium">team name</span> must be
                unique for each team.
              </li>
              <li>
                The <span className="font-medium">team leader</span> should
                register first and add all team members' emails during
                registration.
              </li>
              <li>
                All registrations for a team (leader and members) must use the{" "}
                <span className="font-medium">same team name</span>,{" "}
                <span className="font-medium">leader's email</span>, and{" "}
                <span className="font-medium">member emails</span> to avoid
                issues.
              </li>
              <li>
                After the leader registers,{" "}
                <span className="font-medium">
                  members must register using the same team name and leader's
                  email
                </span>{" "}
                as entered by the leader.
              </li>
              <li>
                The leader can register solo (no members) or add teammates, but{" "}
                <span className="font-medium">
                  cannot add or remove members after registration
                </span>
                . For changes, contact the authorities.
              </li>
              <li>
                Members should only register{" "}
                <span className="font-medium">
                  after the leader has completed registration
                </span>
                .
              </li>
              <li>
                After all team members have registered and gotten each a
                registration confirmation email, the team leader, along with the
                team members, will get a{" "}
                <span className="font-medium">
                  team registration confirmation email
                </span>
                .
              </li>
            </ul>
            <span className="text-primary">
              If you have questions or need help, please contact support.
            </span>
          </div>
          {/* <div className="flex flex-col gap-6 mt-4">
            {teamSegments.map((segment, index) => (
              <div
                key={index}
                className="w-full flex flex-col gap-4 px-2 pt-4 border-t border-primary"
              >
                <h3 className="text-xl max-sm:text-lg font-medium text-primary">
                  {segment.title} Team Details
                </h3>
                <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6">
                  <TextField
                    {...register(
                      `teamSegmentsData.${segment.segmentSlug}.teamName`,
                    )}
                    id={`${segment.segmentSlug}-teamName`}
                    label="Team Name*"
                    variant="outlined"
                    placeholder="Your Team Name"
                    error={
                      !!errors.teamSegmentsData?.[segment.segmentSlug]?.teamName
                    }
                    helperText={
                      errors.teamSegmentsData?.[segment.segmentSlug]?.teamName
                        ? (errors.teamSegmentsData[segment.segmentSlug]
                            ?.teamName?.message as string)
                        : ""
                    }
                    fullWidth
                  />
                  <TextField
                    {...register(
                      `teamSegmentsData.${segment.segmentSlug}.leaderEmail`,
                    )}
                    id={`${segment.segmentSlug}-leaderEmail`}
                    label="Team Leader Email*"
                    variant="outlined"
                    placeholder="Email of the Team Leader"
                    error={
                      !!errors.teamSegmentsData?.[segment.segmentSlug]
                        ?.leaderEmail
                    }
                    helperText={
                      errors.teamSegmentsData?.[segment.segmentSlug]
                        ?.leaderEmail
                        ? (errors.teamSegmentsData[segment.segmentSlug]
                            ?.leaderEmail?.message as string)
                        : ""
                    }
                    fullWidth
                  />
                </div>
                <div className="w-full flex gap-4 max-xl:flex-col max-xl:gap-6">
                  <TextField
                    {...register(
                      `teamSegmentsData.${segment.segmentSlug}.memberEmails.0`,
                    )}
                    id={`${segment.segmentSlug}-memberEmail1`}
                    label="Team Member 1 Email (optional)"
                    variant="outlined"
                    placeholder="Email of the first team member (optional)"
                    error={
                      !!errors.teamSegmentsData?.[segment.segmentSlug]
                        ?.memberEmails?.[0]
                    }
                    helperText={
                      errors.teamSegmentsData?.[segment.segmentSlug]
                        ?.memberEmails?.[0]
                        ? (errors.teamSegmentsData[segment.segmentSlug]
                            ?.memberEmails?.[0]?.message as string)
                        : ""
                    }
                    fullWidth
                  />
                  {segment.maxTeamSize && segment.maxTeamSize > 2 && (
                    <TextField
                      {...register(
                        `teamSegmentsData.${segment.segmentSlug}.memberEmails.1`,
                      )}
                      id={`${segment.segmentSlug}-memberEmail2`}
                      label="Team Member 2 Email (optional)"
                      variant="outlined"
                      placeholder="Email of the second team member (optional)"
                      error={
                        !!errors.teamSegmentsData?.[segment.segmentSlug]
                          ?.memberEmails?.[1]
                      }
                      helperText={
                        errors.teamSegmentsData?.[segment.segmentSlug]
                          ?.memberEmails?.[1]
                          ? (errors.teamSegmentsData[segment.segmentSlug]
                              ?.memberEmails?.[1]?.message as string)
                          : ""
                      }
                      fullWidth
                    />
                  )}
                </div>
                {errors.teamSegmentsData?.[segment.segmentSlug] && (
                  <p className="text-red-600 text-base">
                    {
                      errors.teamSegmentsData[segment.segmentSlug]
                        ?.message as string
                    }
                  </p>
                )}
              </div>
            ))}
          </div> */}
        </FormBox>
      </Activity>
    </>
  );
}
