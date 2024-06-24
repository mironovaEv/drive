/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Checkbox, Popover, Tooltip } from 'antd';
import axios from 'axios';
import fileDownload from 'js-file-download';

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
import { useCallback, useState } from 'react';
import FileMenu from '../FileMenu/fileMenu';
import { IPermission } from '../../api/types';

export type FileComponentProps = {
  type: string;
  name: string;
  fileSize: number;
  trashed: boolean;
  visible: boolean;
  permissions: IPermission[];
  id: string;
  onSetDel: (id: string) => void;
  onCancelDel: (id: string) => void;
  setCheckedToDelete: (id: string[]) => void;
};

const FileComponent = (file: FileComponentProps) => {
  const [checked, setChecked] = useState<boolean>();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const onChange = () => {
    setChecked(!checked);
    if (!checked) {
      file.onSetDel(file.id);
    } else file.onCancelDel(file.id);
  };

  const handleDownload = (id: string) => {
    const url = 'http://localhost:8080/api/drive/files/download/' + id;
    axios.get(url, {}).then(res => {
      let nameHeader = JSON.parse(JSON.stringify(res.headers))['content-disposition'];
      nameHeader = nameHeader.split('=').pop();
      fileDownload(res.data, nameHeader);
    });
  };

  const goFolder = useCallback(
    folder => {
      file.setCheckedToDelete([]);
      navigate(`/files/${folder}`);
    },
    [file, navigate]
  );

  if (!file.trashed && file.visible) {
    const size = file.fileSize ? useFormatBytes(file.fileSize) : '';

    if (file.type.includes('folder')) {
      return (
        <Card onDoubleClick={() => goFolder(file.id)} className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={FolderIcon} />}>
          <div className={'file-card-settings'}>
            <div>
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div>
              <Popover
                className="popover-menu"
                content={<FileMenu setOpen={setOpen} fileItem={file} />}
                placement="rightTop"
                showArrow={false}
                trigger="click"
                open={open}
                onOpenChange={handleOpenChange}
              >
                <Button icon={<SettingsIcon />} className="file-card-settings-button" />
              </Popover>
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
            <div>
              <div>
                <Popover
                  className="popover-menu"
                  content={<FileMenu setOpen={setOpen} fileItem={file} />}
                  placement="rightTop"
                  showArrow={false}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button icon={<SettingsIcon />} className="file-card-settings-button" />
                </Popover>
              </div>
              <div>
                <Button onClick={() => handleDownload(file.id)} icon={<DownloadIcon />} className="file-card-settings-button" />
              </div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div>
              <div>
                <Popover
                  className="popover-menu"
                  content={<FileMenu setOpen={setOpen} fileItem={file} />}
                  placement="rightTop"
                  showArrow={false}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button icon={<SettingsIcon />} className="file-card-settings-button" />
                </Popover>
              </div>
              <div>
                <Button onClick={() => handleDownload(file.id)} icon={<DownloadIcon />} className="file-card-settings-button" />
              </div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div>
              <div>
                <Popover
                  className="popover-menu"
                  content={<FileMenu setOpen={setOpen} fileItem={file} />}
                  placement="rightTop"
                  showArrow={false}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button icon={<SettingsIcon />} className="file-card-settings-button" />
                </Popover>
              </div>
              <div>
                <Button onClick={() => handleDownload(file.id)} icon={<DownloadIcon />} className="file-card-settings-button" />
              </div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div>
              <div>
                <Popover
                  className="popover-menu"
                  content={<FileMenu setOpen={setOpen} fileItem={file} />}
                  placement="rightTop"
                  showArrow={false}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button icon={<SettingsIcon />} className="file-card-settings-button" />
                </Popover>
              </div>
              <div>
                <Button onClick={() => handleDownload(file.id)} icon={<DownloadIcon />} className="file-card-settings-button" />
              </div>
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
              <Checkbox className="file-card-settings-checkbox" onChange={onChange}></Checkbox>
            </div>
            <div>
              <div>
                <Popover
                  className="popover-menu"
                  content={<FileMenu setOpen={setOpen} fileItem={file} />}
                  placement="rightTop"
                  showArrow={false}
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  <Button icon={<SettingsIcon />} className="file-card-settings-button" />
                </Popover>
              </div>
              <div>
                <Button onClick={() => handleDownload(file.id)} icon={<DownloadIcon />} className="file-card-settings-button" />
              </div>
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
