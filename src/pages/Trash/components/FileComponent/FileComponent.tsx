/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Checkbox, Tooltip } from 'antd';

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
import { useState } from 'react';

type FileComponentProps = {
  type: string;
  name: string;
  fileSize: number;
  trashed: boolean;
  visible: boolean;
  id: string;
  onSetUntrash: (id: string) => void;
  onCancelUntrash: (id: string) => void;
  setCheckedToUntrash: (id: string[]) => void;
};

const FileComponent = (file: FileComponentProps) => {
  const [checked, setChecked] = useState<boolean>();

  const onChange = () => {
    setChecked(!checked);
    if (!checked) {
      file.onSetUntrash(file.id);
    } else file.onCancelUntrash(file.id);
  };

  if (file.trashed && file.visible) {
    const size = file.fileSize ? useFormatBytes(file.fileSize) : '';

    if (file.type.includes('folder')) {
      return (
        <Card className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={FolderIcon} />}>
          <div className={'file-card-settings'}>
            <div>
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div></div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div></div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div></div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div></div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div></div>
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
