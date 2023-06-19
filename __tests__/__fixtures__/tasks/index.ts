import { Task } from '@/app/dashboard/page';
import { faker } from '@faker-js/faker';


export function createTask(): Task {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: faker.lorem.sentence(),
    status: faker.string.sample({ min: 1, max: 5 }),
    priority: faker.string.sample({ min: 1, max: 5 })   
   
  };
}
export const mockTask = {
  id: faker.string.uuid(),
  title: faker.lorem.words(5),
  description: faker.lorem.sentence(),
  status: faker.string.sample({ min: 1, max: 5 }),
  priority: faker.string.sample({ min: 1, max: 5 })   
 
};
export const mockTaskList: Task[] = faker.helpers.multiple(createTask, {
  count: 5,
});



export const taskFields = [
  { id: "Title", errorMessage: "Title is required", value: faker.lorem.words() },
  { id: "Description", errorMessage: "Description is required", value: faker.lorem.sentence() },
  { id: "Status", errorMessage: "Status is required", value: faker.lorem.word() },
  { id: "Priority", errorMessage: "Priority is required", value: faker.lorem.word() },
];