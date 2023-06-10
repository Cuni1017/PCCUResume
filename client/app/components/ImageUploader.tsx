"use client";

import React, { useRef, useState } from "react";
import MyDialog from "./MyDialog";
import MyButton from "@/app/components/MyButton";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "@/util/useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import Slider from "@mui/material/Slider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import CloseIcon from "@mui/icons-material/Close";

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

const ImageUploader = ({
  isOpen,
  onClose,
  onUpload,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (formData: FormData) => void;
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null);
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState<number | undefined>(1 / 1);

  const [alignment, setAlignment] = React.useState("web");

  // const [imgSrc, setImgSrc] = useState("");
  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function onDropFile(e: any) {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setCrop(undefined); // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.dataTransfer.files[0]);
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  function handleToggleAspectClick(proportion?: number) {
    if (!proportion) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(proportion);
      setCrop(centerAspectCrop(width, height, proportion));
    }
  }

  const blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    const now = new Date();
    b.lastModifiedDate = now;
    b.lastModified = now.getTime();
    b.name = fileName;
    b.webkitRelativePathts = "";

    //Cast to a File() type
    return new File([theBlob], "image.png") as File;
  };

  function onUploadBtnClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        throw new Error("Failed to create blob");
      }

      const fd = new FormData();
      fd.append("file", blobToFile(blob, "image.png"));
      onUpload(fd);

      // if (blobUrlRef.current) {
      //   URL.revokeObjectURL(blobUrlRef.current)
      // }
      // blobUrlRef.current = URL.createObjectURL(blob)
      // hiddenAnchorRef.current!.href = blobUrlRef.current
      // hiddenAnchorRef.current!.click()
    });
  }

  return (
    <MyDialog isOpen={isOpen} onClose={onClose} maxWidth="lg">
      <div className="rounded w-full">
        <div className="text-lg px-6 py-3">
          {!!imgSrc ? "編輯圖片" : "上傳圖片"}
        </div>
        <hr className="w-full m-0 p-0" />
        <div className="p-6">
          <input
            id="imageUploadInput"
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            style={{ display: "none" }}
          />

          {!!imgSrc ? (
            <>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={imgSrc}
                  style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                  onLoad={onImageLoad}
                />
              </ReactCrop>

              <div className="absolute right-2 top-2">
                <button
                  className="rounded bg-inherit border-none hover:bg-gray-300 cursor-pointer flex items-center justify-center p-1"
                  onClick={() => setImgSrc("")}
                >
                  <CloseIcon />
                </button>
              </div>

              <div>
                <label htmlFor="scale-input">大小: </label>
                <Slider
                  size="small"
                  id="scale-input"
                  value={scale}
                  disabled={!imgSrc}
                  step={0.1}
                  min={0}
                  max={1}
                  onChange={(e: Event, newValue: number | number[]) => {
                    if (typeof newValue === "number") {
                      setScale(newValue);
                    }
                  }}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </div>

              <div>
                <label htmlFor="rotate-input">旋轉: </label>
                <Slider
                  size="small"
                  id="rotate-input"
                  value={rotate}
                  disabled={!imgSrc}
                  step={1}
                  min={0}
                  max={180}
                  onChange={(e: Event, newValue: number | number[]) => {
                    if (typeof newValue === "number") {
                      setRotate(newValue);
                    }
                  }}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                />
              </div>
              <div>
                <ToggleButtonGroup
                  color="primary"
                  value={aspect || "自訂義"}
                  exclusive
                  onChange={(
                    event: React.MouseEvent<HTMLElement>,
                    newAlignment: string
                  ) => {
                    handleToggleAspectClick(
                      typeof newAlignment === "string"
                        ? undefined
                        : newAlignment
                    );
                  }}
                  aria-label="裁切比例"
                >
                  <ToggleButton value={"自訂義"}>自訂義</ToggleButton>
                  <ToggleButton value={1 / 1}>1：1</ToggleButton>
                  <ToggleButton value={3 / 1}>3：1</ToggleButton>
                  <ToggleButton value={16 / 9}>16：9</ToggleButton>
                </ToggleButtonGroup>
              </div>
            </>
          ) : (
            <div
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={onDropFile}
              onClick={() => {
                if (inputRef.current) inputRef.current.click();
              }}
              className="p-10 h-[10rem] bg-gray-100 hover:bg-gray-200 cursor-pointer flex items-center justify-center flex-col"
            >
              <div>
                <InsertPhotoIcon />
              </div>
              <div>將圖片拖拉到這裡或選擇檔案。</div>
            </div>
          )}

          {!!completedCrop && (
            <>
              <div>
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    objectFit: "contain",
                    width: completedCrop.width,
                    height: completedCrop.height,
                    display: "none",
                  }}
                />
              </div>
              <div>
                <a
                  ref={hiddenAnchorRef}
                  download
                  style={{
                    position: "absolute",
                    top: "-200vh",
                    visibility: "hidden",
                  }}
                >
                  Hidden download
                </a>
              </div>
            </>
          )}

          {!!imgSrc && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              <MyButton
                classnames="text-white bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                onClick={onUploadBtnClick}
              >
                上傳
              </MyButton>
              <MyButton classnames="hover:bg-gray-300" onClick={onClose}>
                取消
              </MyButton>
            </div>
          )}
        </div>
      </div>
    </MyDialog>
  );
};

export default ImageUploader;
