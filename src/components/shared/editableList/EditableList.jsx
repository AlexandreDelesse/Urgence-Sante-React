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
    setList((old) => old.map((el, i) => (index === i ? value : el)));
  };

  const onAddElement = () => {
    setList((old) => [...old, ""]);
  };

  useEffect(() => {
    onChange(list);
  }, [list]);

  return (
    <ListGroup variant="flush">
      {list.map((el, index) => (
        <ListGroup.Item key={el}>
          {index === 0 && list[0] ? (
            el
          ) : (
            <>
              <EditableLabel
                onChange={(element) => onElementChanges(index, element)}
                initialValue={el}
                placeholder={placeholder || "Cliquez pour renseigner l'element"}
              />
            </>
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
