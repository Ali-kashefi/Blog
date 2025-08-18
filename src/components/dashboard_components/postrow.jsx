import Table from "@/ui/Table";
import React from "react";
import { toLocalDateShort } from "utils/dateFormatter";
import { toPersianDigits } from "utils/numberFormatter";
import truncateText from "utils/trancateText";
import { translatetopersian } from "utils/translatetopersian";
import { Deletpost, Updatepost } from "./Button";

function Postrow({ post, index }) {
  const { title, category, author, createdAt, type } = post;

  const translation = translatetopersian(type);

  return (
    <>
      <Table.Row>
        <td>{toPersianDigits(index + 1)}</td>
        <td>{truncateText(title, 20)}</td>
        <td>{truncateText(category.title, 15)}</td>
        <td>{author.name}</td>
        <td>{toLocalDateShort(createdAt)}</td>
        <td>
          {typeof translation === "object" ? (
            <span className={translation.classname}>{translation.lable}</span>
          ) : (
            translation
          )}
        </td>
        <td>
          <div className="flex items-center gap-x-3">
            <Updatepost id={post._id} /> <Deletpost post={post} />
          </div>
        </td>
      </Table.Row>
    </>
  );
}

export default Postrow;
