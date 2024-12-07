import { FolderCollection } from '#types/collection/folder';
import { Cookie } from '#types/cookie';
import { Variables } from '#types/options';

export type Servers = {
  [key: string]: string;
};

export type RequestOptions = {
  cookies: Cookie[];
  collections: { [key: string]: FolderCollection };
  servers: Servers;
  variables: Variables;
};
