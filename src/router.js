import canvasComponent from '@/components/canvas';
import threeJs from '@/components/threeJs';

const routes = [
    {
        path: '/',
        component: canvasComponent,
        name: 'canvas',
        alias: 'canvas',
    },
    {
        path: '/three',
        component: threeJs,
        name: 'three',
        alias: 'three'
    }
];

export default routes;