using System;
using System.IO;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Diplomski.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() : base()
        {

        }

        public DatabaseContext(DbContextOptions<DbContext> options) : base(options)
        {

        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            string envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory()))
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile($"appsettings.{envName}.json", optional: true)
                .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("Database"));
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            var cascadeFKs = builder.Model.GetEntityTypes()
                .SelectMany(t => t.GetForeignKeys())
                .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

            foreach (var fk in cascadeFKs)
            {
                fk.DeleteBehavior = DeleteBehavior.Restrict;
            }

            // #region Seed Groups
            // builder.Entity<Group>().HasData(new Group { Id=1, Active = true, Name = "Akademika", Added = DateTime.Now, Changed = DateTime.Now });
            // #endregion

            builder.Entity<User>()
                .HasKey(c => c.Id);

               
            builder.Entity<Post>()
               .HasKey(c => c.Id);


            base.OnModelCreating(builder);
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<BloodType> BloodType { get; set; }
       
    }
}
