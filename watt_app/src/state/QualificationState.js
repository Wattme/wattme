const SET_DATE_END_QUALIFICATION = "QualificationState/SET_DATE_END_QUALIFICATION";

const initialState = {
  dateEndQualification: 0,
};

export function setDateEndQualification (dateEndQualification) {
  return {
    type: SET_DATE_END_QUALIFICATION,
    dateEndQualification
  }
}

export default function QualificationState(state = initialState, action = {}) {
  switch (action.type) {

    case SET_DATE_END_QUALIFICATION: {
      let dateEndQualification = action.dateEndQualification;

      return {
        ...state,
        dateEndQualification
      };
    }

    default:
      return state;
  }
}
