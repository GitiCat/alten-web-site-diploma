import { CategoryArticleService } from './category-article.service'
import { UsersService } from './users.service'

export default {
    CategoriesArticle: new CategoryArticleService(),
    Users: new UsersService
}