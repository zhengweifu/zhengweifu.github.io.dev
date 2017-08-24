const asyncComponent = loadComponent => (
    class AsyncComponent extends Component {
        state = {
            Component: null,
        }

        componentWillMount() {
            if (this.hasLoadedComponent()) {
                return;
            }

            loadComponent()
                .then(module => module.default)
                .then((Component) => {
                    this.setState({ Component });
                })
                .catch((err) => {
                    console.error(`Cannot load component in <AsyncComponent />`);
                    throw err;
                });
        }

        hasLoadedComponent() {
            return this.state.Component !== null;
        }

        render() {
            const { Component } = this.state;
            return (Component) ? <Component {...this.props} /> : null;
        }
    }
);

export default [
	{exact: true, path: '/' component: asyncComponent(() => import('ThreeMakePage'))},
	{exact: true, path: '/resume' component: asyncComponent(() => import('ResumePage'))},
	{exact: true, path: '/work/threemake' component: asyncComponent(() => import('ThreeMakePage'))},
	{exact: true, path: '/work/threemodeltool' component: asyncComponent(() => import('ThreeModelToolPage'))},
	{exact: true, path: '/work/threeLRtool' component: asyncComponent(() => import('ThreeLightingRenderToolPage'))},
	{exact: true, path: '/work/threeBAtool' component: asyncComponent(() => import('ThreeBindAnimationToolPage'))},
	{exact: true, path: '/work/threeothertool' component: asyncComponent(() => import('ThreeOtherToolPage'))},
	{exact: true, path: '/work/webgl' component: asyncComponent(() => import('WebGLPage'))},
	{exact: true, path: '/work/reactmenu' component: asyncComponent(() => import('MenuPage'))},
	{exact: true, path: '/work/reactbutton' component: asyncComponent(() => import('ButtonPage'))},
	{exact: true, path: '/work/reacticon' component: asyncComponent(() => import('IconPage'))},
	{exact: true, path: '/work/reactgrid' component: asyncComponent(() => import('GridPage'))},
	{exact: true, path: '/work/reactinput' component: asyncComponent(() => import('InputPage'))},
	{exact: true, path: '/work/reactslider' component: asyncComponent(() => import('SliderPage'))},
	{exact: true, path: '/work/reactlabel' component: asyncComponent(() => import('LabelPage'))},
	{exact: true, path: '/work/php' component: asyncComponent(() => import('PhpPage'))},
	{exact: true, path: '/work/enginedvs3d' component: asyncComponent(() => import('ThreeEngineDVS3DPage'))},
	{exact: true, path: '/work/engineunity3d' component: asyncComponent(() => import('ThreeEngineUnity3DPage'))},
	{exact: true, path: '/work/engineunreal' component: asyncComponent(() => import('ThreeEngineUnrealPage'))},
	{exact: true, path: '/work/ai' component: asyncComponent(() => import('AIPage'))}
];