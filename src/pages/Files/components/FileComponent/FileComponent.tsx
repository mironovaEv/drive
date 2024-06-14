/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Tooltip } from 'antd';

const { Meta } = Card;
import './fileComponent.scss';
import Icon from '@ant-design/icons/lib/components/Icon';
import { FolderIcon } from '../../../../shared/img/files/Folder';
import { ImageIcon } from '../../../../shared/img/files/Image';
import { AudioIcon } from '../../../../shared/img/files/Audio';
import { VideoIcon } from '../../../../shared/img/files/Video';
import { DefaultIcon } from '../../../../shared/img/files/Default';
import { useFormatBytes } from '../../../../shared/hooks/useFormatBytes/useFormatBytes';
import { TextIcon } from '../../../../shared/img/files/Text';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '../../../../shared/img/files/Settings';
import { DownloadIcon } from '../../../../shared/img/files/Download';

type FileComponentProps = {
  type: string;
  name: string;
  fileSize: number;
  trashed: boolean;
  visible: boolean;
  id: string;
};

const FileComponent = (file: FileComponentProps) => {
  const navigate = useNavigate();

  const onDownloadFile = () => {
    window.location.href = `http://localhost:8080/api/drive/files/download/${file.id}`;
  };

  if (!file.trashed && file.visible) {
    const size = file.fileSize ? useFormatBytes(file.fileSize) : '';

    if (file.type.includes('folder')) {
      return (
        <Card
          onDoubleClick={() => navigate(`/files/${file.id}`)}
          className={'file-card'}
          hoverable
          cover={<Icon className={'file-card-icon'} component={FolderIcon} />}
        >
          <div className={'file-card-settings'}>
            <div>
              <Button icon={<SettingsIcon />} className="file-card-settings-button" />
            </div>
            <div>
              <Button onClick={onDownloadFile} icon={<DownloadIcon />} className="file-card-settings-button" />
            </div>
          </div>
          <Tooltip placement="right" title={file.name}>
            <Meta title={file.name} description={size} />
          </Tooltip>
        </Card>
      );
    } else if (file.type.includes('img')) {
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={ImageIcon} />}>
          <div className={'file-card-settings'}>
            <div>
              <Button icon={<SettingsIcon />} className="file-card-settings-button" />
            </div>
            <div>
              <Button onClick={onDownloadFile} icon={<DownloadIcon />} className="file-card-settings-button" />
            </div>
          </div>
          <Tooltip placement="right" title={file.name}>
            <Meta title={file.name} description={size} />
          </Tooltip>
        </Card>
      );
    } else if (file.type.includes('audio')) {
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={AudioIcon} />}>
          <div className={'file-card-settings'}>
            <div>
              <Button icon={<SettingsIcon />} className="file-card-settings-button" />
            </div>
            <div>
              <Button onClick={onDownloadFile} icon={<DownloadIcon />} className="file-card-settings-button" />
            </div>
          </div>
          <Tooltip placement="right" title={file.name}>
            <Meta title={file.name} description={size} />
          </Tooltip>
        </Card>
      );
    } else if (file.type.includes('text')) {
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={TextIcon} />}>
          <div className={'file-card-settings'}>
            <div>
              <Button icon={<SettingsIcon />} className="file-card-settings-button" />
            </div>
            <div>
              <Button onClick={onDownloadFile} icon={<DownloadIcon />} className="file-card-settings-button" />
            </div>
          </div>
          <Tooltip placement="right" title={file.name}>
            <Meta title={file.name} description={size} />
          </Tooltip>
        </Card>
      );
    } else if (file.type.includes('video')) {
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={VideoIcon} />}>
          <div className={'file-card-settings'}>
            <div>
              <Button icon={<SettingsIcon />} className="file-card-settings-button" />
            </div>
            <div>
              <Button onClick={onDownloadFile} icon={<DownloadIcon />} className="file-card-settings-button" />
            </div>
          </div>
          <Tooltip placement="right" title={file.name}>
            <Meta title={file.name} description={size} />
          </Tooltip>
        </Card>
      );
    } else {
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={DefaultIcon} />}>
          <div className={'file-card-settings'}>
            <div>
              <Button icon={<SettingsIcon />} className="file-card-settings-button" />
            </div>
            <div>
              <Button onClick={onDownloadFile} icon={<DownloadIcon />} className="file-card-settings-button" />
            </div>
          </div>
          <Tooltip placement="right" title={file.name}>
            <Meta title={file.name} description={size} />
          </Tooltip>
        </Card>
      );
    }
  } else return null;
};

export default FileComponent;
