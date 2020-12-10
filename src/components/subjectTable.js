import React from "react";
import SubjectRow from "./SubjectRow";

class subjectTable extends React.Component {
  render() {
    return (
      <div class="div-table-dashboard">
        <table className="table table-dashboard">
          <thead>
            <th>
              <strong>Name</strong>
            </th>
            <th>
              <strong>Choose</strong>
            </th>
          </thead>
          <tbody>
            {this.props.filteredSubjects
              .sort()
              .filter(function (item, pos, ary) {
                return !pos || item != ary[pos - 1];
              })
              .map((subject) => {
                return (
                  <SubjectRow
                    filterTeacher={this.props.filterTeacher}
                    subjects={subject}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default subjectTable;
