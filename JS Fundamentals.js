//A CourseInfo object, which looks like this:
// {
//     "id": number,
//     "name": string,
// }
  

//   An AssignmentGroup object, which looks like this:
// {
//   "id": 1,
//   "name": string,
// //   the ID of the course the assignment group belongs to
//   "course_id": number,
// //   the percentage weight of the entire assignment group
//   "group_weight": number,
//   "assignments": [AssignmentInfo],
// }

// Each AssignmentInfo object within the assignments array looks like this:
// {
//   "id": number,
//   "name": string,
  // the due date for the assignment
//   "due_at": Date string,
  // the maximum points possible for the assignment
//   "points_possible": number,
// }

// An array of LearnerSubmission objects, which each look like this:
// {
//     "learner_id": number,
//     "assignment_id": number,
//     "submission": {
//       "submitted_at": Date string,
//       "score": number
//     }
// }


//Input Validation:
//courseInfo:
const courseInfo = {
    id: 101,
    name: "Software Engineering"
};

// assignmentGroup and assignmentInfo:
const assignmentGroup = {
    id: "101-1",
    name: "Introduction to Web Development",
    course_id: 101,
    group_weight: 10,
    assignmentInfo: [
        {
            id: 1,
            name: "Intro to HTML",
            due_at: "01-31-2025",
            points_possible: 100,
        },
        {
            id: 2,
            name: "Intro to CSS",
            due_at: "02-28-2025",
            points_possible: 200,
        },
        {
            id: 3, 
            name: "Intro to JS",
            due_at: "03-31-2025",
            points_possible: 300,
        }
    ]

};

// LearnerSubmission:
const learnerSubmissions = [
    {
        learner_id: 123,
        assignment_id: 1,
        submission: {
            submitted_at: "01-25-2025",
            score: 99
        }
    },
    {
        learner_id: 123,
        assignment_id: 2,
        submission: {
            submitted_at: "02-20-2025",
            score: 199
        }
    },
    {
        learner_id: 123,
        assignment_id: 3,
        submission: {
            submitted_at: "01-30-2025",
            score: 299,
        }
    },
    {
        learner_id: 456,
        assignment_id: 1,
        submission: {
            submitted_at: "01-31-2025",
            score: 50
        }
    },
    {
        learner_id: 456,
        assignment_id: 2,
        submission: {
            submitted_at: "02-28-2025",
            score: 100
        }
    },
    {
        learner_id: 456,
        assignment_id: 3,
        submission: {
            submitted_at: "01-31-2025",
            score: 200,
        }
    }
];

// Validation of Data:
//Validate assignmentGroup for the course
function validateData(courseInfo, assignmentGroup) {
        if (assignmentGroup.course_id !== courseInfo.id) {
            throw new Error(`AssignmentGroup ${assignmentGroup.id} does not belong to course ${courseInfo.id}`);
        }
    }

/* The variable assignmentMap is an object that serves as a lookup table (or dictionary) to store assignment details efficiently.

Purpose:
It allows quick access to assignment information (points_possible and due_at) using an assignment's id as the key.
Instead of iterating over assignmentInfo every time we need assignment details, we can directly retrieve them from assignmentMap in constant time O(1).*/

const assignmentMap = {};  // Define assignmentMap before use
assignmentGroup.assignmentInfo.forEach(assignment => {
    assignmentMap[assignment.id] = {
        points_possible: assignment.points_possible,
        due_at: new Date(assignment.due_at)
    };
});
