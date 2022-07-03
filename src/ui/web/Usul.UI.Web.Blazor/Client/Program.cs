using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Usul.UI.Web.Blazor.Client;
using Usul.UI.Web.Blazor.Client.AuthProviders;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Usul.UI.Web.Blazor.Client
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.RootComponents.Add<App>("#app");
            builder.RootComponents.Add<HeadOutlet>("head::after");

            builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddAuthorizationCore();
			builder.Services.AddScoped<AuthenticationStateProvider, TestAuthStateProvider>();
            builder.Services.AddOidcAuthentication(options =>
{
    
    builder.Configuration.Bind("Local", options.ProviderOptions);
});


            await builder.Build().RunAsync();
        }
    }
}