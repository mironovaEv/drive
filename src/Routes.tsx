import { FileTextOutlined } from '@ant-design/icons';
import { IRoute } from './shared/types';
import { Paths } from './shared/constants';
import { FilesRoutes } from './pages/Files/FilesRoutes';

export const rootRoutes: Array<IRoute> = [
  {
    path: Paths.Files,
    icon: FileTextOutlined,
    title: 'Мои файлы',
    children: FilesRoutes,
  },
];
