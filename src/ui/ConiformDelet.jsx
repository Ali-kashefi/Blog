import React from "react";
import Button from "./Button";
import SubmitButton from "./SubmitButton";
import { TrashIcon } from "@heroicons/react/24/outline";

function ConiformDelet({ resuprceName, onClose, disable, onConifirm }) {
  return (
    <>
      <form onSubmit={onConifirm}>
      <h2>   ایا از حذف {resuprceName }مطمعن هستید ؟</h2>
        <div className="flex justify-between items-center gap-x-8">
          <Button
            onClick={onClose}
            variant="outline"
            type="button"
            className="flex-1"
          >
            لغو
          </Button>
          <SubmitButton
            type="submit"
            onClick={onConifirm}
            disabled={disable}
            variant="danger"
            className="flex gap-x-2  justify-center items-center flex-1"
          >
            <TrashIcon className="w-5" />
            <span>حذف</span>
          </SubmitButton>
        </div>
      </form>
    </>
  );
}

export default ConiformDelet;
