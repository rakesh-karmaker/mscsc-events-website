import dayjs from "dayjs";

export default function grades(): { label: string; value: string }[] {
  const grades: { label: string; value: string }[] = [];
  for (let i = 1; i <= 12; i++) {
    grades.push({ label: `Class ${i}`, value: `${i}` });
    if (i === 10) {
      grades.push({
        label: `SSC-${dayjs().year().toString().slice(-2)}`,
        value: "ssc",
      });
    }
  }
  return grades;
}
