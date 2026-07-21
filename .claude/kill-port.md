lsof -ti :3000 | xargs kill -9 2>/dev/null && echo "killed" || echo "nothing on port 3000"

