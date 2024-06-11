import { FileTextOutlined, DeleteOutlined } from '@ant-design/icons';
import { IRoute } from './shared/types';
import { Paths } from './shared/constants';
import { FilesRoutes } from './pages/Files/FilesRoutes';
import { TrashRoutes } from './pages/Trash/TrashRoutes';

export const rootRoutes: Array<IRoute> = [
  {
    path: Paths.Files,
    icon: FileTextOutlined,
    title: 'Мои файлы',
    children: FilesRoutes,
  },
  {
    path: Paths.Trashcan,
    icon: DeleteOutlined,
    title: 'Корзина',
    children: TrashRoutes,
  },
];
