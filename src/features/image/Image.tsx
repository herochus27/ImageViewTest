import React, { useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectImage,
  getAsyncImages,
  imageStatus,
  ImageSelected,
  ImageState
} from './imageSlice';
import styles from './Image.module.css';
import { Button, Image, Container, Row, Col, Alert } from 'react-bootstrap';



export function Images() {
  const status = useAppSelector(imageStatus);
  const selected = useAppSelector(ImageSelected);
  const dispatch = useAppDispatch();
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getAsyncImages()).then(images => {
      setImages(images.payload);
    });
  }, [])

  return (
    <div>
      <Container>
        <span className={styles.status}>{status}</span>
        <Row>
          <Col md="4" className={styles.imageList}>
            <Container fluid>
              <Row>
                {
                  images.map((i: any) => {
                    return <Col md="4" key={i.id} className={styles.mt10} onClick={() => dispatch(selectImage(i.download_url))}>
                      <Image src={i.download_url} height="100" width="100%" />
                    </Col>
                  })
                }
              </Row>
            </Container>
          </Col>
          <Col md="8" className={styles.mt10}>
            {
              selected ?
                <Container>
                  <Row>
                    <Image src={selected} height="500"></Image>
                  </Row>
                  <Row className={styles.mt10}>
                    <Button onClick={() => dispatch(selectImage(""))} variant="primary">Clear</Button>
                  </Row>
                </Container>
                :
                <Alert key="success" variant="success">
                  There is not image selected!
                </Alert>
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}
