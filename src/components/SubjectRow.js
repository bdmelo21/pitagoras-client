import React from "react";
import "bulma/css/bulma.css";
function SubjectRow(props) {
  return (
    <tr>
      <td>
        <strong>{props.subjects}</strong>
      </td>
      <td>
        <button
          class="button is-success"
          onClick={() => props.filterTeacher(props.subjects)}
        >
          Show Me a Teacher
        </button>
      </td>
    </tr>
  );
}
export default SubjectRow;
