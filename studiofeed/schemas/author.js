export default {
  title: 'Author',
  name: 'author',
  type: 'document',
  fields: [
    {
      title: 'Full name',
      name: 'full_name',
      type: 'string',
      validation: (Rule) => Rule.required().error('You must have a full name'),
    },
    {
      title: 'Short Bio',
      name: 'short_bio',
      type: 'text',
    },
    {
      title: 'Avatar',
      name: 'avatar',
      type: 'image',
      validation: (Rule) => Rule.required().error('You must have an avatar'),
    },
  ],
}
