import React, { createRef, HTMLAttributes, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classNames from 'classnames';
import a from './img/a.jpg';
import a1 from './img/a1.jpg';
import b from './img/b.jpg';
import b1 from './img/b1.jpg';
import c from './img/c.jpg';
import c1 from './img/c1.jpg';
import d from './img/d.jpg';
import d1 from './img/d1.jpg';
import e from './img/e.jpg';
import e1 from './img/e1.jpg';
import f from './img/f.jpg';
import f1 from './img/f1.jpg';
import g from './img/g.jpg';
import g1 from './img/g1.jpg';
import h from './img/h.jpg';
import h1 from './img/h1.jpg';

import { LeftSquareFilled, RightSquareFilled } from '@ant-design/icons';
import styles from './index.module.less';

const imgs = [a, b, c, d, e, f, g, h];
const bigImgs = [a1, b1, c1, d1, e1, f1, g1, h1];

const Magnifier = () => {
  // 放大
  const [magnify, setMagnify] = useState<boolean>(false);

  const maskRef = createRef<HTMLDivElement>();
  const coverBoxRef = createRef<HTMLDivElement>();
  const glassRef = createRef<HTMLDivElement>();
  const glassImgRef = createRef<HTMLImageElement>();

  const [hoverIndex, setHoverIndex] = useState<number>(0);

  const LeftIcon: React.FC<HTMLAttributes<any>> = (props) => {
    const { onClick } = props;
    return (
      <LeftSquareFilled
        className={styles.leftIcon}
        onClick={onClick}
        style={{ fontSize: 32 }}
      />
    );
  };

  const RightIcon: React.FC<HTMLAttributes<any>> = (props) => {
    const { onClick } = props;
    return (
      <RightSquareFilled
        className={styles.rightIcon}
        onClick={onClick}
        style={{ fontSize: 32 }}
      />
    );
  };

  const listSetting: Settings = {
    dots: false,
    draggable: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
    nextArrow: <RightIcon />,
    prevArrow: <LeftIcon />,
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const left = e.clientX - maskRef.current!.offsetWidth / 2; //横坐标
    const top = e.clientY - maskRef.current!.offsetHeight / 2; //纵坐标

    const margin = coverBoxRef.current!.getBoundingClientRect();

    //设置遮挡层的left和top
    let x = left - margin.left; //margin
    let y = top - margin.top; //margin

    //为遮挡层设置范围
    x = x < 0 ? 0 : x; //如果横坐标小于0就设置为0
    y = y < 0 ? 0 : y; //如果纵坐标小于0就设置为0

    //如果横坐标大于横向最大移动距离就设置为横向最大移动距离
    x =
      x > coverBoxRef.current!.offsetWidth - maskRef.current!.offsetWidth
        ? coverBoxRef.current!.offsetWidth - maskRef.current!.offsetWidth
        : x;
    //如果纵坐标大于纵向最大移动距离就设置为纵向最大移动距离
    y =
      y > coverBoxRef.current!.offsetHeight - maskRef.current!.offsetHeight
        ? coverBoxRef.current!.offsetHeight - maskRef.current!.offsetHeight
        : y;

    //设置mask的定位
    maskRef.current!.style.left = `${x}px`;
    maskRef.current!.style.top = `${y}px`;

    glassImgRef.current!.style.left = -x * 3 + 'px';
    glassImgRef.current!.style.top = -y * 3 + 'px';
  };

  return (
    <div className={styles.containerLeft}>
      <div
        className={styles.coverBox}
        onMouseEnter={() => setMagnify(true)}
        onMouseLeave={() => setMagnify(false)}
        onMouseMove={handleMouseMove}
        ref={coverBoxRef}
      >
        {/* 黄色的框框 */}
        <div
          className={styles.mask}
          style={{ display: magnify ? 'block' : 'none' }}
          ref={maskRef}
        ></div>
        <img src={imgs[hoverIndex]} className={styles.cover}></img>
        {/* 放大镜 */}
        <div
          onMouseEnter={() => setMagnify(false)}
          className={styles.glass}
          ref={glassRef}
          style={{ display: magnify ? 'block' : 'none' }}
        >
          <img
            src={bigImgs[hoverIndex]}
            className={styles.glassImg}
            ref={glassImgRef}
          ></img>
        </div>
      </div>

      <Slider {...listSetting} className={styles.listSlider}>
        {imgs.map((item: string, index: number) => (
          <div
            key={`${item}-${index}`}
            className={styles.box}
            onMouseEnter={() => setHoverIndex(index)}
          >
            <a>
              <img
                src={item}
                className={classNames(styles.listImg, {
                  [styles.hoverd]: hoverIndex === index,
                })}
              ></img>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Magnifier
