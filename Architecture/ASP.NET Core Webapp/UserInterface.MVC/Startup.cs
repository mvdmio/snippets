using BusinessLogic.Interfaces;
using BusinessLogic.Interfaces.Repositories;
using BusinessLogic.Services;
using Database;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace UserInterface.MVC
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // This is an unfortunate byproduct of using ASP.NET Core. The program.cs must exist in this project for the application to work, so orchestration must also be done in this project.
            // This means that the ASP.NET core has a direct dependency on all used project for technical reasons. In an ideal world the Program.cs would live in a separate orchestration project
            // so that the API project itself would only have a direct dependency to the business logic project.
            services.AddScoped<IBusinessLogicService, BusinessLogicService>();
            services.AddScoped<IBusinessLogicRepository, DatabaseBusinessLogicRepository>();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if(env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
