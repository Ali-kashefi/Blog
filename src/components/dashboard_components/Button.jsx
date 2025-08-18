"use client";
import { useDeletpost } from "@/hook/useDeletPost";
import ButtonIcon from "@/ui/ButtonIcon";
import ConiformDelet from "@/ui/ConiformDelet";
import Modal from "@/ui/Modal";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export function Deletpost({ post: { title, id } }) {
  const [isOpen, setIsopen] = useState(false);
  const {isDeleting, deletePost } = useDeletpost();
  return (
    <>
      <ButtonIcon variant={"outline"} onClick={() => setIsopen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>
      {isOpen && (
        <Modal onClose={() => setIsopen(false)} open={isOpen} title={title}>
          <ConiformDelet
            resuprceName={title}
            onClose={() => setIsopen(false)}
            onConiform={() => deletePost(id)}
            disable={isDeleting}
          />
        </Modal>
      )}
    </>
  );
}
export function Updatepost({ id }) {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <ButtonIcon variant="outline">
        <PencilIcon />
      </ButtonIcon>
    </Link>
  );
}
export function CraetPost() {
  return (
    <>
      <Link
        href={`/profile/posts/create`}
        className="justify-self-end flex gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-medium
  transition-colors hover:bg-primary-700"
      >
        <span className="hidden md:block text-white">ایجاد پست</span>
        <PlusIcon className="w-5 text-white" />
      </Link>
    </>
  );
}
