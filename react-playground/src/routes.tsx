import { LimitPreviewPage } from './pages/LimitPreviewPage';

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<LimitPreviewPage />} />
    )
);
