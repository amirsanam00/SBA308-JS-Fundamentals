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

function getLearnerData(courseInfo, assignmentGroup, learnerSubmissions) {
    try {
        if (assignmentGroup.course_id !== courseInfo.id) {
            throw new Error(`AssignmentGroup ${assignmentGroup.id} does not belong to course ${courseInfo.id}`);
        }

//Assignment lookup
const assignmentMap = {};  
assignmentGroup.assignmentInfo.forEach(assignment => {
    if (typeof assignment.points_possible !== "number" || assignment.points_possible < 0) {
        throw new Error(`Invalid points_possible for assignment ${assignment.id}`);
    }
    if (assignment.points_possible === 0) {
        throw new Error(`points_possible cannot be zero for assignment ${assignment.id}`);
    }
    assignmentMap[assignment.id] = {
        points_possible: assignment.points_possible,
        due_at: new Date(assignment.due_at)
    };
});

// Create learnerData 
const learnerData = {};

learnerSubmissions.forEach(submission => {
    const { learner_id, assignment_id, submission: { score } } = submission;

    if (!assignmentMap[assignment_id]) {
        console.warn(`Skipping submission for unknown assignment ID: ${assignment_id}`);
        return;
    }

    const dueDate = assignmentMap[assignment_id].due_at;
    const submitDate = new Date(submission.submitted_at);

    if (submitDate > dueDate) {
        console.warn(`Skipping early submission for assignment ${assignment_id}`);
        return;
    }

    //late submission penalty
    let finalScore = score;
    if (submitDate > dueDate) {
        finalScore -= 0.1 * assignmentMap[assignment_id].points_possible;
    }

    if (!learnerData[learner_id]) {
        learnerData[learner_id] = { learner_id, assignments: {} };
    }

    learnerData[learner_id].assignments[assignment_id] = finalScore / assignmentMap[assignment_id].points_possible;
});

// Calculate weighted average for each learner
Object.values(learnerData).forEach(learner => {
    let totalScore = 0, totalPossible = 0;

    Object.entries(learner.assignments).forEach(([assignmentId, percentageScore]) => {
        assignmentId = Number(assignmentId); 
        if (assignmentMap[assignmentId]) {
            let points_possible = assignmentMap[assignmentId].points_possible;
            totalScore += percentageScore * points_possible;
            totalPossible += points_possible;
        }
    });

    learner.avg = totalPossible > 0 ? totalScore / totalPossible : 0;
});


return Object.values(learnerData);
    } catch (error) {
        console.error("Error processing learner data:", error.message);
        return [];
    }
}

console.log(getLearnerData(courseInfo, assignmentGroup, learnerSubmissions));

/* The variable assignmentMap is an object that serves as a lookup table (or dictionary) to store assignment details efficiently.

Purpose:
It allows quick access to assignment information (points_possible and due_at) using an assignment's id as the key.
Instead of iterating over assignmentInfo every time we need assignment details, we can directly retrieve them from assignmentMap in constant time O(1).*/