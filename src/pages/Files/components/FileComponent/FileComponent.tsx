/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Tooltip } from 'antd';

const { Meta } = Card;
import './fileComponent.scss';
import Icon from '@ant-design/icons/lib/components/Icon';
import { FolderIcon } from '../../../../shared/img/files/Folder';
import { ImageIcon } from '../../../../shared/img/files/Image';
import { AudioIcon } from '../../../../shared/img/files/Audio';
import { VideoIcon } from '../../../../shared/img/files/Video';
import { DefaultIcon } from '../../../../shared/img/files/Default';

type FileComponentProps = {
  type: string;
};

const FileComponent = (file: FileComponentProps) => {
  switch (file.type) {
    case 'folder':
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={FolderIcon} />}>
          <Meta title="Новая папка" description="25 МБ" />
        </Card>
      );
    case 'img':
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={ImageIcon} />}>
          <Meta title="Картинка" description="25 МБ" />
        </Card>
      );
    case 'audio':
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={AudioIcon} />}>
          <Meta title="Аудиофайл" description="25 МБ" />
        </Card>
      );
    case 'video':
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={VideoIcon} />}>
          <Meta title="Видеофайл" description="25 МБ" />
        </Card>
      );
    default:
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={DefaultIcon} />}>
          <Tooltip placement="right" title="Другой тип файла">
            <Meta title="Другой тип файла" description="25 МБ" />
          </Tooltip>
        </Card>
      );
  }
};

export default FileComponent;
