@echo off
echo Installing Dispatch Optimizer Dependencies...

echo.
echo Installing Backend Dependencies...
cd backend
call npm install
cd ..

echo.
echo Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo.
echo Installation complete!
echo.
echo To start the application:
echo 1. Run start-backend.bat in one terminal
echo 2. Run start-frontend.bat in another terminal
echo 3. Open http://localhost:3000 in your browser
pause

