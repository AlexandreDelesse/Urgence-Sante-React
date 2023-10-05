import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import EditableLabel from "../editableLabel/EditableLabel";
import { BsPlusCircle } from "react-icons/bs";

export default function EditableList({
  initialList,
  onChange,
  buttonLabel,
  placeholder,
}) {
  const [list, setList] = useState(initialList || []);

  const onElementChanges = (index, value) => {
    const newList = list.map((el, i) => (index === i ? value : el));
    setList(newList);
    onChange(newList.filter((el) => el !== ""));
  };

  const onAddElement = () => {
    if (list.some((value) => value === "")) return;
    setList((old) => [...old, ""]);
  };

  useEffect(() => {
    setList(initialList || []);
  }, [initialList]);

  return (
    <ListGroup variant="flush">
      {list.map((el, index) => (
        <ListGroup.Item className="d-flex align-items-center gap-2" key={el}>
          {index === 0 && list[0] ? (
            el
          ) : (
            <EditableLabel
              onChange={(element) => onElementChanges(index, element)}
              initialValue={el}
              placeholder={placeholder || "Cliquez pour renseigner l'element"}
            />
          )}
        </ListGroup.Item>
      ))}
      <ListGroup.Item
        onClick={onAddElement}
        className="d-flex align-items-center gap-2"
      >
        <BsPlusCircle color="orange" /> {buttonLabel || "Ajouter un element"}
      </ListGroup.Item>
    </ListGroup>
  );
}
