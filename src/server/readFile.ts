import {PUBLIC_DIRECTUS_URL as URL} from "astro:env/server";
import slugify from "@/utils/slugify.ts";
import buildQuery from "@/utils/buildQuery.ts";

type Params = {
  id: string;
  name: string;
  params?: Record<string, any>;
}

const readFile = async ({id, name, params}: Params): Promise<string> => {
  try {
    if (!id) throw new Error('ID is required');

    const nameFile = name || `image_${id}`;
    const queryParams = {format: 'webp', ...params};

    return `${URL}/assets/${id}/${slugify(nameFile)}.webp?${buildQuery(queryParams)}`;

  } catch (error) {
    console.error(`Error trying to get media. ID: ${id}. Name: ${name}`, error);
    return '';
  }
};

export default readFile;