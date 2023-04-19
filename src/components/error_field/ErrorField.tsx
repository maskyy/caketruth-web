import { useAppSelector } from "../../hooks"
import { ServerErrors } from "../../types/api";
import { errorTranslations } from "../../util/error-translations";

interface ErrorFieldProps {
  field: keyof ServerErrors;
}

export const ErrorField = ({field}: ErrorFieldProps) => {
  const errors = useAppSelector((state) => state.errors);
  if (!errors || !errors[field]) {
    return null;
  }
  const text = Array.isArray(errors[field]) ? errors[field][0] : errors[field] as string;
  return (
    <p>{errorTranslations[text] ?? text}</p>
  )
};
