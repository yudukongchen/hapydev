import about from './about.json';
import folder from './sample-folder.json';
import petInfo from './pet-info.json';
import createPet from './create-pet.json';
import updatePet from './update-pet.json';
import deletePet from './delete-pet.json';
import findPets from './find-pets.json';

export const SAMPLE_APIS = [
  {
    data: about,
  },
  {
    data: folder,
    children: [
      {
        data: petInfo,
      },
      {
        data: createPet,
      },
      {
        data: updatePet,
      },
      {
        data: deletePet,
      },
      {
        data: findPets,
      },
    ],
  },
];
