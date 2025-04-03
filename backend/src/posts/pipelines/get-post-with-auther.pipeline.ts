export const GetPostWithAutherName = [
  {
    $lookup: {
      from: 'users',
      localField: 'author',
      foreignField: '_id',
      as: 'users',
    },
  },
  {
    $project: {
      _id: 1,
      title: 1,
      content: 1,
      author: {
        $arrayElemAt: ['$users.name', 0],
      },
      createdAt: 1,
      updatedAt: 1,
    },
  },
];
