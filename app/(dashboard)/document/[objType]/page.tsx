"use client";
import { useParams } from "next/navigation";
import React from "react";
import NotFound from "../notfound";
import { ObjectTypes } from "@/constants/ObjectTypes";
import { isValidObjectTypeName } from "@/helpers";
interface DocumentPageProps {
  objType: string;
}

const DocumentPage = (params: DocumentPageProps) => {
  const { objType } = useParams();
  // find in ObjectTypes
  console.log(ObjectTypes.SalesOrder.name);

  /// check objType exists in ObjectsTypes
  if(!isValidObjectTypeName(objType)){
    console.log("not valid object type");
    return <NotFound />;
  }
  return <div>Document {objType}</div>;
};

export default DocumentPage;
