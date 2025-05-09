interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mark Essien',
    role: 'CEO of hotels.ng',
    content: 'Abdussalam is an excellent designer and works great with feedback. He has been a great addition to our team and collaborates well with developers.',
    avatar: '/assets/avatars/mark.jpg',
    rating: 5
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Garden Enthusiast',
    content: 'Plant-ID has completely changed how I care for my garden. The accuracy of identification and detailed care tips have saved several of my plants!',
    rating: 5
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Botanist',
    content: 'As a professional botanist, I am impressed by the accuracy and depth of Plant-ID. I now recommend it to all my students as a learning tool.',
    rating: 5
  },
  {
    id: 4,
    name: 'Elena Rodriguez',
    role: 'Interior Designer',
    content: 'I use Plant-ID for all my projects that involve indoor plants. It helps me select the right plants for different spaces and lighting conditions.',
    rating: 5
  },
  {
    id: 5,
    name: 'Thomas Wright',
    role: 'Home Gardener',
    content: 'Before Plant-ID, I was constantly guessing about what my plants needed. Now I know exactly how to care for each one. Game changer!',
    rating: 5
  },
  {
    id: 6,
    name: 'Priya Sharma',
    role: 'Biology Teacher',
    content: 'My students love using Plant-ID for their botany projects. It makes learning about plant species fun and interactive.',
    rating: 4
  },
  {
    id: 7,
    name: 'David Kim',
    role: 'Plant Shop Owner',
    content: 'We use Plant-ID in our store to help customers identify and learn about their purchases. It has increased customer satisfaction dramatically.',
    rating: 5
  },
  {
    id: 8,
    name: 'Olivia Martinez',
    role: 'Environmental Scientist',
    content: 'The accuracy of Plant-ID is impressive. I have tested it against professional databases and it performs remarkably well.',
    rating: 5
  },
  {
    id: 9,
    name: 'James Wilson',
    role: 'Landscape Architect',
    content: 'Plant-ID has become an essential tool in my workflow. It helps me quickly identify species when I am on site surveys.',
    rating: 5
  },
  {
    id: 10,
    name: 'Emma Thompson',
    role: 'Urban Farmer',
    content: 'The care instructions are detailed and accurate. I have seen healthier growth in my plants since following Plant-ID recommendations.',
    rating: 4
  }
];

export default testimonials;
