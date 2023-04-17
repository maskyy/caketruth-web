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
  const text = errors[field][0];
  return (
    <p>{errorTranslations[text] ?? text}</p>
  )
};
