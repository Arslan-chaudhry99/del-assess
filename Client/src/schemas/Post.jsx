import * as Yup from "yup";
export const Post = Yup.object({
  model: Yup.string().required("Model"),
  Price: Yup.string().required("Price"),
  phone: Yup.string().required("Number"),
  location: Yup.string().required("Location"),
  copies: Yup.string().required("Copies"),
  file: Yup.mixed().required("Image"),
});
