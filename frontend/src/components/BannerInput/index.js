import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import api from '../../services/api';

import { Container } from './styles';

function BannerInput({ name, bannerId, bannerUrl }) {
  const ref = useRef();
  const { registerField } = useField(name);

  const [file, setFile] = useState(bannerId && bannerId);
  const [preview, setPreview] = useState(bannerUrl && bannerUrl);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    setFile(response.data.id);
    setPreview(response.data.url);
  }

  return (
    <Container>
      <label htmlFor="banner">
        {preview ? (
          <img src={preview} alt="" />
        ) : (
          <div>
            <MdCameraAlt size={60} color="#444" />
            Selecionar Imagem
          </div>
        )}

        <input
          type="file"
          id="banner"
          accept="image/*"
          data-file={file}
          ref={ref}
          onChange={handleChange}
        />
      </label>
    </Container>
  );
}

BannerInput.propTypes = {
  name: PropTypes.string.isRequired,
  bannerUrl: PropTypes.string,
  bannerId: PropTypes.string,
};

BannerInput.defaultProps = {
  bannerUrl: null,
  bannerId: null,
};

export default BannerInput;
