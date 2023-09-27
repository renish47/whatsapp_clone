import { ChangeEvent, FC, InputHTMLAttributes, forwardRef } from "react";
// import ReactDOM from "react-dom";

interface PhotoPickerProps extends InputHTMLAttributes<HTMLInputElement> {
  onChangeHandler: (e: any) => {};
}

const PhotoPicker = forwardRef<HTMLInputElement, PhotoPickerProps>(
  ({ onChangeHandler }, ref) => {
    const component = (
      <input
        type="file"
        hidden
        id="photoPicker"
        onChange={onChangeHandler}
        ref={ref}
        accept="image/*"
      />
    );
    // return ReactDOM.createPortal(
    //   component,
    //   document.getElementById("photoPickerElement") as HTMLElement
    // );
    return component;
  }
);
export default PhotoPicker;
