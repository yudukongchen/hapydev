FROM node:20.18.1-alpine3.21   as dependencies
WORKDIR /app
COPY  . .
RUN npm install pnpm -g
RUN pnpm install
RUN npm run build


FROM nginx:latest  as production
WORKDIR /usr/share/nginx/html
COPY  --from=dependencies /app/dist .
COPY nginx.conf /etc/nginx/nginx.conf
COPY bootstrap.sh .
RUN chmod +x bootstrap.sh
EXPOSE 80


CMD ["/bin/bash","./bootstrap.sh"]
