import React, { Component } from 'react';

import WorkPage from './WorkPage';

import CommonRenderRelative from './CommonRenderRelative';

import { WEB_ROOT } from '../../config';

export default () => {
	return <WorkPage siderSelectedKey='2-4'  breadcrunbs={['工作', '三维工具开发', '杂项']}>
		<CommonRenderRelative relativePathName={`${WEB_ROOT}assets/images/threeToolDev/other/`} relativeFileName='relative.json' />
	</WorkPage>
};