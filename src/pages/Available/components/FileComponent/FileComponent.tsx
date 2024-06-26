/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Popover, Tooltip } from 'antd';
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

import { TextIcon } from '../../../../shared/img/files/Text';
import { useNavigate } from 'react-router-dom';
import { SettingsIcon } from '../../../../shared/img/files/Settings';
import { DownloadIcon } from '../../../../shared/img/files/Download';
import { useCallback, useState } from 'react';
import FileMenu from '../FileMenu/fileMenu';
import { FileComponentProps } from '../../../Files/components/FileComponent/FileComponent';
import { useFormatBytes } from '../../../../shared/hooks/useFormatBytes/useFormatBytes';

const FileComponent = (file: FileComponentProps) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
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
      navigate(`/available/${folder}`);
    },
    [navigate]
  );

  if (!file.trashed && file.visible && file.myRole != 'owner') {
    const size = file.size ? useFormatBytes(file.size) : '';

    if (file.type.includes('folder')) {
      return (
        <Card onDoubleClick={() => goFolder(file.id)} className={'file-card'} hoverable cover={<Icon className={'file-card-icon'} component={FolderIcon} />}>
          <div className={'file-card-settings'}>
            <div></div>
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
                <Button className={` file-card-settings-button ${file.myRole == 'reader' ? 'noVis' : ''}`} icon={<SettingsIcon />} />
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
            <div></div>
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
                  <Button icon={<SettingsIcon />} className={` file-card-settings-button ${file.myRole == 'reader' ? 'noVis' : ''}`} />
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
            <div></div>
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
                  <Button icon={<SettingsIcon />} className={` file-card-settings-button ${file.myRole == 'reader' ? 'noVis' : ''}`} />
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
            <div></div>
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
                  <Button icon={<SettingsIcon />} className={` file-card-settings-button ${file.myRole == 'reader' ? 'noVis' : ''}`} />
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
            <div></div>
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
                  <Button icon={<SettingsIcon />} className={` file-card-settings-button ${file.myRole == 'reader' ? 'noVis' : ''}`} />
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
            <div></div>
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
                  <Button icon={<SettingsIcon />} className={` file-card-settings-button ${file.myRole == 'reader' ? 'noVis' : ''}`} />
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