// Initial sample data
const initialCategories = [
  {
    id: '1',
    name: 'Active Cases No',
    description: 'Short description.',
    posts: 4
  },
  {
    id: '2',
    name: 'Caregiving Tips & Resources',
    description: 'A practical discussion board for caregivers to share helpful tips and resources.',
    posts: 0
  },
  {
    id: '3',
    name: 'Caregiving & Work-Life Balance',
    description: 'Caregiving & Work-Life Balance — short text example.',
    posts: 11
  },
  {
    id: '4',
    name: 'Caring for a Child with Special Needs',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit beatae in dolorem maxime molestiae explicabo nulla distinctio ut, dignissimos ullam aspernatur! Minima voluptatum expedita voluptatibus ipsam sit maxime, dolore velit porro architecto nostrum facere accusamus nesciunt quas aspernatur atque distinctio, excepturi in laborum natus tempore delectus? Eos rem nemo quae odit? Dicta, omnis quisquam labore sunt blanditiis, debitis dolorum deleniti rerum ab repellat harum?',
    posts: 9
  },
  {
    id: '5',
    name: 'Daily Caregiving Challenges',
    description: 'Daily Caregiving Challenges',
    posts: 64
  }
];

export function getCategories() {
  if (typeof window === 'undefined') return initialCategories;
  
  const stored = localStorage.getItem('categories');
  if (!stored) {
    localStorage.setItem('categories', JSON.stringify(initialCategories));
    return initialCategories;
  }
  return JSON.parse(stored);
}

export function saveCategories(categories) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('categories', JSON.stringify(categories));
}