export const CreateCommentMessages = {
  comment: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  rating: {
    minValue: 'Minimum rating is 1',
    maxValue: 'Maximum rating is 5',
    invalidFormat: 'Must be Number',
  },
  user: {
    invalidFormat: 'user field must be a valid id'
  },
  offer: {
    invalidFormat: 'offerId field must be a valid id'
  },
} as const;
